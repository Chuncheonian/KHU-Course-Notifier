import React, { Component } from 'react';
import CourseDetail from '../components/CourseDetail';
import CourseMap from '../components/CourseMap';
import Comment from '../components/Comment';
import CommentAdd from '../components/CommentAdd';
import Paper from '@material-ui/core/Paper';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginTop: 20,
    marginLeft: 300,
    marginRight: 300,
    marginBottom: 20,
  },
  paperMap: {
    marginTop: theme.spacing.unit * 5,
    marginLeft: theme.spacing.unit * 54.1,
    marginRight: theme.spacing.unit * 54.1,
    marginBottom: theme.spacing.unit * 5,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
});

class CourseInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: '',
      comments: '',
      completed: 0,
    }
  }

  stateRefresh = () => {
    this.setState({
      course: '',
      completed: 0,
    });
    this.callApi()
      .then(res => this.setState({ course: res }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({ course: res }))
      .catch(err => console.log(err));
    this.callApiComments()
      .then(res => this.setState({ comments: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const urlId = this.props.match.params[0];
    const response = await fetch(`/api/customers/${urlId}`);
    const body = await response.json();
    return body;
  }

  stateRefreshComments = () => {
    this.setState({
      comments: '',
      completed: 0,
    });
    this.callApiComments()
      .then(res => this.setState({ comments: res }))
      .catch(err => console.log(err));
  }

  callApiComments = async () => {
    const urlId = this.props.match.params[0];
    const response = await fetch(`/api/comments/${urlId}`);
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    const { classes } = this.props;
    const cellList = ["번호", "작성자", "댓글", "별점"];
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              KHU Course Notifier
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper className={classes.paperMap}>
          {this.state.course ? this.state.course.map((c) => {
            return (<CourseMap stateRefresh={this.stateRefresh} kmlURL={c.kmlURL} />);
          }) : <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />}
        </Paper>
        <Paper className={classes.paper} variant="outlined">
          {this.state.course ? this.state.course.map((c) => {
            return (<CourseDetail stateRefresh={this.stateRefresh} key={c.id} id={c.id} name={c.name} distance={c.distance} category={c.category} location={c.location} maxAltitude={c.maxAltitude} minAltitude={c.minAltitude} level={c.level} form={c.form} />);
          }) : <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />}
        </Paper>

        <div className={classes.menu}>
          <CommentAdd stateRefresh={this.stateRefreshComments} courseNum={this.props.match.params[0]} />
        </div>

        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.comments ? this.state.comments.map(c => {
                return (<Comment stateRefresh={this.stateRefreshComments} key={c.commentId} commentId={c.commentId} author={c.author} content={c.content} rating={c.rating} createdTime={c.createdTime} />);
              }) :
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(CourseInfoPage);