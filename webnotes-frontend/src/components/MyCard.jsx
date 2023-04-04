import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Input,
} from '@mui/material';
import { Delete, Edit, Check, Close } from '@mui/icons-material';
import { socket } from '@/socket';


const MyCard = ({ id, title, description, users, thisUser, onDelete, onUpdate }) => {
  const [editing, setEditing] = React.useState(false);
  const [editedDescValue, setEditedDescValue] = React.useState(description);
  const [editedTitle, setEditedTitle] = React.useState(title);

  const update = () => {
    console.log(id, title, editedDescValue, thisUser)
    if (editedDescValue !== description || editedTitle !== title) {
      socket.emit("note:update", {
        id: id,
        title: editedTitle,
        description: editedDescValue,
        user: thisUser
      })
    }
    setEditing(false)
  }

  const deleteOne = () => {
    socket.emit("note:delete", { id: id })
  }


  return (
    <Card sx={{ width: "100%", transition: "300ms ease-in-out", "&:hover": { backgroundColor: 'yellow', transform: "scale(1.1)", zIndex: 99 }, "&:hover .icBtn": { opacity: 1, display: 'inline' }, minWidth: 250, maxWidth: 600, backgroundColor: 'greenyellow', position: 'relative' }}>
      <CardHeader
        // avatar={
        //   <Avatar aria-label="recipe" style={{backgroundColor:"green"}}>
        //     {users.length > 0 ? users[users.length-1][0].toUpperCase():"A"}
        //   </Avatar>
        // }
        title={editing ?
          <Input onChange={(event) => setEditedTitle(event.target.value)} sx={{ borderBottom: 0, fontSize: 14 }} value={editedTitle} /> :
          title
        }
        subheader={editing ? <div style={{ display: "flex", alignItems: 'end', justifyContent: 'center' }}>
          <Input autoFocus sx={{ textDecoration: 'none' }} variant="outlined" multiline maxRows={3} fullWidth={true} value={editedDescValue} onChange={(e) => setEditedDescValue(e.target.value)} />
          <IconButton aria-label="delete" onClick={update}>
            <Check color='primary' />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => {
            setEditing(false);
            setEditedDescValue(description);
            setEditedTitle(title);
          }}>
            <Close color="error" />
          </IconButton>
        </div>
          : description
        }
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
      <div>
        <IconButton className='icBtn' sx={{ position: 'absolute', top: 0, right: 0, borderRadius: 0, borderBottomLeftRadius: 8, background: 'rgba(0,0,0,.6)', display: 'none', padding: 0 }} aria-label="delete" onClick={deleteOne}>

          <Delete color="error" />
        </IconButton>
        <IconButton className='icBtn' sx={{ position: 'absolute', borderRadius: 0, borderTopLeftRadius: 8, background: 'rgba(0,0,0,.6)', bottom: 0, right: 0, display: 'none', padding: 0 }} aria-label="update" onClick={() => setEditing(true)}>
          <Edit color="primary" />
        </IconButton>
      </div>
    </Card>
  );
};

export default MyCard;
