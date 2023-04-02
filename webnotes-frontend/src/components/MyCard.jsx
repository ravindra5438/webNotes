import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Input,
} from '@mui/material';
import { Delete, Edit,Check, Close } from '@mui/icons-material';
import { socket } from '@/socket';


const MyCard = ({id,title, description, users,thisUser, onDelete, onUpdate }) => {
  const [editing,setEditing] = React.useState(false);
  const [editedDescValue,setEditedDescValue] = React.useState(description);

  const update = () => {
    console.log(id,title,editedDescValue,thisUser)
    socket.emit("note:update",{
      id:id,
      title: title,
      description: editedDescValue,
      user:thisUser
    })
    setEditing(false)
  }

  const deleteOne = () => {
    socket.emit("note:delete",{id:id})
  }


  return (
    <Card style={{width:345,backgroundColor:'greenyellow'}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" style={{backgroundColor:"green"}}>
            {users[0] ? users[0][0].toUpperCase():"A"}
          </Avatar>
        }
        title={title}
        subheader={editing?editedDescValue:description}
      />
      <CardContent>
      {editing &&
          <div style={{display:"flex"}}>
            <Input value={editedDescValue} onChange={(e) => setEditedDescValue(e.target.value)}/>
            <IconButton aria-label="delete" onClick={update}>
              <Check />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => {
              setEditing(false);
              setEditedDescValue(description);
            }}>
              <Close/>
            </IconButton>
          </div>
        }
        <Typography variant="body2" color="textSecondary" component="p">
          {users.map((user, index) => (
            <span key={index}>
              {user}
              {index !== users.length - 1 && ', '}
            </span>
          ))}
        </Typography>
        
      </CardContent>
      <IconButton aria-label="delete" onClick={deleteOne}>
        <Delete />
      </IconButton>
      <IconButton aria-label="update" onClick={() => setEditing(true)}>
        <Edit />
      </IconButton>
    </Card>
  );
};

export default MyCard;
