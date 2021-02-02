import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTodosList, addTodosList } from '../redux/TodoList/action';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Add from '@material-ui/icons/Add';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));



const Home = (props) => {
    const [isLoader, setLoader] = useState(false)
    const getTodoList = () => {
        props.getTodosList()
        setLoader(props.todolist.showLoader)
    }
    useEffect(() => {
        setLoader(true)
        getTodoList();
    }, []);

    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);
    const [editId, seteditId] = React.useState();
    const [editDescription, seteditDescription] = React.useState();

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            setLoader(true)
            axios({
                method: 'PUT',
                url: `https://tiny-list.herokuapp.com/api/v1/users/110/tasks/` + value + `/completed`,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        setLoader(false)
                        getTodoList();
                    } else {
                        setLoader(false)
                    }
                }).catch(err => {
                    setLoader(false)
                })
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
            setLoader(true)
            axios({
                method: 'PUT',
                url: `https://tiny-list.herokuapp.com/api/v1/users/110/tasks/` + value + `/uncompleted`,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        setLoader(false)
                        getTodoList();
                    } else {
                        setLoader(false)
                    }
                }).catch(err => {
                    setLoader(false)
                })
        }
        setChecked(newChecked);
    };
    const handleToggleEdit = (id,value) => () => {
         seteditId(id);
         seteditDescription(value);
           
    };
    const handleSubmit = (e) => {
        if (e.charCode === 13 && e.target.value !== "" && e.target.value.trim() !== "") {
            const data = { "description": e.target.value }
            props.addTodosList(data)
        }else if(e.charCode === 13 && e.target.value === "" && e.target.value.trim() === ""){
            alert("Please type at least 1 word.")
        }
    }
    const handleEdit = (e) => {
        if (e.charCode === 13 && e.target.value !== "" && e.target.value.trim() !== "") {
            seteditDescription(e.target.value);
            const data = { "description": e.target.value }
            setLoader(true)
            axios({
                method: 'PUT',
                url: `https://tiny-list.herokuapp.com/api/v1/users/110/tasks/` + editId,
                data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        setLoader(false)
                        seteditId("")
                        getTodoList();
                    } else {
                        setLoader(false)
                    }
                }).catch(err => {
                    setLoader(false)
                })
        }else if(e.charCode === 13 && e.target.value === "" && e.target.value.trim() === ""){
            alert("Please type at least 1 word.")
        }
    }
    
    const deleteData = (id) => {
        setLoader(true)
        axios({
            method: 'DELETE',
            url: `https://tiny-list.herokuapp.com/api/v1/users/110/tasks/` + id,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 204) {
                    setLoader(false)
                    getTodoList();
                } else {

                }
            }).catch(err => {
                setLoader(false)
            })
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginTop: "85px"
        }}>

            <Loader
                type="Triangle"
                color="#fff"
                height={100}
                width={100}
                visible={isLoader}
            />
            <div className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <Add color="secondary"/>
                    </Grid>
                    <Grid item>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField  className="textfield" id="input-with-icon-grid" placeholder="Add to list..." onKeyPress={handleSubmit} />
                        </form>
                    </Grid>
                </Grid>
            </div>
            <List className={classes.root}>

                {props.todolist.todosList && (props.todolist.todosList).filter(el => el.completed_at === null).sort((a, b) => a.created_at < b.created_at ? 1 : -1).map((value) => {
                    const labelId = `checkbox-list-label-${value.id}`;

                    return (
                        <ListItem key={value.id} className="list-item" role={undefined} dense button >
                            <ListItemIcon onClick={handleToggle(value.id)}>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value.id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            {editId !== value.id ? <ListItemText id={labelId} primary={value.description} onClick={handleToggleEdit(value.id,value.description)}/> : null}
                            {editId === value.id ? <TextField id="input-with-icon-grid" autoComplete="off" defaultValue={editDescription} placeholder="Add to list..." onKeyPress={handleEdit} />: null}
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                    <DeleteIcon className="deletebutton" onClick={() => deleteData(value.id)} />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
                {props.todolist.todosList && (props.todolist.todosList).filter(el => el.completed_at !== null).sort((a, b) => a.completed_at > b.completed_at ? 1 : -1).map((value) => {
                    const labelId = `checkbox-list-label-${value.id}`;

                    return (
                        <ListItem key={value.id} role={undefined} dense button >
                            <ListItemIcon onClick={handleToggle(value.id)}>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value.id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.description} style={{ color: "grey", textDecoration: "line-through" }} />
                            
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                    <DeleteIcon onClick={() => deleteData(value.id)} />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </div>

    )
}

const mapStateToProps = state => ({
    todolist: state.TodoList,
});
const mapDispatchToProps = dispatch => {
    return {
        addTodosList: (data) => dispatch(addTodosList(data)),
        getTodosList: () => dispatch(getTodosList())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home)

