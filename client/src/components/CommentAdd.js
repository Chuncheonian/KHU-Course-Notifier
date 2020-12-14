import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  hidden: {
    display: 'none'
  },
  paper: {
    marginTop: 20,
    marginLeft: 300,
    marginRight: 300,
    marginBottom: 20,
  },
});

class CommentAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      content: '',
      rating: 0,
      open: false,
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    this.addComment()
      .then((response) => {
        console.log(response.data);
        this.props.stateRefresh();
      })
    this.setState({
      author: '',
      content: '',
      rating: 0,
      open: false
    })
  }

  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value
    })
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  
  getRating = (e) => {
    this.rating = e.target.value;
    console.log(this.rating);
  }

  addComment = () => {
    const url = '/api/comments';
    let scriptJSON = { courseNum : this.props.courseNum, author: this.state.author, content: this.state.content, rating: this.rating };
    const config = {
      headers: {
          'content-type': 'application/json'
      }
    }
    return post(url, JSON.stringify(scriptJSON), config);
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  }

  handleClose = () => {
    this.setState({
      author: '',
      content: '',
      rating: 0,
      open: false
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          댓글 추가하기
                </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>댓글 추가</DialogTitle>
          <DialogContent style={{width: 300}}>
            <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
            <label htmlFor="raised-button-file">
            </label>
            <TextField label="게시자" type="text" variant="outlined" name="author" value={this.state.author} onChange={this.handleValueChange} /><br /><br />
            <TextField id="outlined-multiline-static" label="댓글" rows={3} variant="outlined"  name="content" value={this.state.content} onChange={this.handleValueChange} multiline/><br /><br />
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">별점</Typography>
              <Rating
                name="simple-controlled"
                value={this.rating}
                onChange={this.getRating}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

}

export default withStyles(styles)(CommentAdd);