import React from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  tableCell: {
    fontSize: '1rem'
  },
})

class CourseDetail extends React.Component {
  // render -> 항상 수행되는 내용, 실제 화면에 구현
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper} variant="outlined">
      <Grid container spacing={3}>
        <Grid item xs><Typography variant="h4" color="primary" gutterBottom>이름</Typography></Grid>
        <Grid item xs><Typography variant="h4">{this.props.name}</Typography></Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs><Typography variant="h4" color="primary" gutterBottom>분류</Typography></Grid>
        <Grid item xs><Typography variant="h4">{this.props.category}</Typography></Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs><Typography variant="h4" color="primary" gutterBottom>거리</Typography></Grid>
        <Grid item xs><Typography variant="h4">{this.props.distance}</Typography></Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs><Typography variant="h4" color="primary" gutterBottom>최대고도</Typography></Grid>
        <Grid item xs><Typography variant="h4">{this.props.maxAltitude}</Typography></Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs><Typography variant="h4" color="primary" gutterBottom>최저고도</Typography></Grid>
        <Grid item xs><Typography variant="h4">{this.props.minAltitude}</Typography></Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs><Typography variant="h4" color="primary" gutterBottom>난이도</Typography></Grid>
        <Grid item xs><Typography variant="h4">{this.props.level}</Typography></Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs><Typography variant="h4" color="primary" gutterBottom>도로형태</Typography></Grid>
        <Grid item xs><Typography variant="h4">{this.props.form}</Typography></Grid>
      </Grid>
      </Paper>
    )
  }
}

export default withRouter(withStyles(styles)(CourseDetail));
