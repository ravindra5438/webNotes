import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
// import { makeStyles } from '@mui/material/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 345,
//   },
//   avatar: {
//     backgroundColor: theme.palette.secondary.main,
//   },
// }));

const MyCard = ({ title, description, users, onDelete, onUpdate }) => {
  // const classes = useStyles();

  return (
    <Card style={{width:345}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" style={{backgroundColor:"green"}}>
            {users[0] ? users[0][0].toUpperCase():"A"}
          </Avatar>
        }
        title={title}
        subheader={description}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {users.map((user, index) => (
            <span key={index}>
              {user}
              {index !== users.length - 1 && ', '}
            </span>
          ))}
        </Typography>
      </CardContent>
      <IconButton aria-label="delete" onClick={onDelete}>
        <Delete />
      </IconButton>
      <IconButton aria-label="update" onClick={onUpdate}>
        <Edit />
      </IconButton>
    </Card>
  );
};

export default MyCard;
