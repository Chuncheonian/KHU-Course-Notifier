import React from 'react';
import { withRouter } from 'react-router-dom';
import { TableRow, TableCell} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  tableCell: {
    fontSize: '1rem'
  },
})

class Course extends React.Component {
  // render -> 항상 수행되는 내용, 실제 화면에 구현
  render() {
    const { classes } = this.props;
    return (
      <TableRow>
        <TableCell className={classes.tableCell}>{this.props.id}</TableCell>
        {/* <TableCell className={classes.tableCell}><img src={this.props.image} alt="profile" /></TableCell> */}
        <TableCell className={classes.tableCell}>{this.props.name}</TableCell>
        <TableCell className={classes.tableCell}>{this.props.distance}</TableCell>
        <TableCell className={classes.tableCell}>{this.props.category}</TableCell>
        <TableCell className={classes.tableCell}>{this.props.level}</TableCell>
        <TableCell className={classes.tableCell}><Button variant="contained" color="primary" onClick={() => {this.props.history.push(`/information/${this.props.id}`);}}>상세정보</Button></TableCell>
      </TableRow>
    )
  }
}

export default withRouter(withStyles(styles)(Course));