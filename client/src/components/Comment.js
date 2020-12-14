import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Comment extends React.Component {
    // render -> 항상 수행되는 내용, 실제 화면에 구현
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.commentId}</TableCell>
                <TableCell>{this.props.author}</TableCell>
                <TableCell>{this.props.content}</TableCell>
                <TableCell>{this.props.rating}</TableCell>
                {/* <TableCell>{this.props.createdTime}</TableCell> */}
            </TableRow>
        )
    }
}

export default Comment;