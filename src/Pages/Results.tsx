import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import dataJson from '../data-2.json'
import { Search } from '../Components/Search';

export const Results: React.FC = () => {
  const allData: any = dataJson
  const allIds = allData.comments.map((e:any)=> e.id)
  const startId: number = Math.min(...allIds)
  let [id, setId] = useState<any>(startId);
  const [store, setStore] = useState<any>();
  

  useEffect(() => {
    fetch(`http://localhost:3000/comments/${id}`)
      .then((response) => response.json())
      .then((json) => setStore(json));
  }, [id]);

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          backgroundColor: theme.palette.background.paper,
        },
      }));  
    const classes = useStyles();
    const [value, setValue] = React.useState(0);


  const FirstUser =() => {
    if (store?.id !== id) {
      return (
        <>
        <p>No User Found with ID number: {id}</p>
        </>
      )

    } else {
      return (
        <>       
        <p>Id number: {store?.id}</p>
        <p>Full Name: {store?.data.firstName} {store?.data.lastName}</p>
        <p>Gender: Male - {store?.data.male}, Female - {store?.data.female} </p>
        <p>Date of Birth: {store?.data.DoB}</p>
        <p>Biography {store?.data.Bio}</p>
        <div><img className="responsive-img" src={store?.Image} alt="new" width="800"/></div>  
        
    </>   
      )
    }
  }

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const nextPage = (e: React.MouseEvent) => {
e.preventDefault()
setId(id + 1) 
 
}

  const previousPage = (e: React.MouseEvent) => {
    e.preventDefault()
    setId(id - 1)
    }

  const DeleteUserId = (e:any) => {
    e.preventDefault()  
               fetch(`http://localhost:3000/comments/${id}`, {
                 method: 'DELETE',
                 headers: { 'Content-Type' : 'application/json'},
               })
                 .then((response) => response.json())
                 .then((json) => console.log(json)); 
                 alert('User by ID Deleted Successfully')         
  }

const Statistics = () => {
  const allUsers = allData.comments.map((e:any)=> e.data.firstName).join(', ')
  const usersCount = allIds.length
 
  return (
    <>
    <h6>All Statistics</h6>
    <p>Count of All Users are {usersCount} </p>
    <p>Users Names are: {allUsers}</p>
    </>
  )
}

const LastAddedUser = () => {
  const lastId: number = Math.max(...allIds)
  setId(lastId)

  return (
    <>
        <p>Id number: {store?.id}</p>
        <p>Full Name: {store?.data.firstName} {store?.data.lastName}</p>
        <p>Gender: Male {store?.data.male}, Female {store?.data.female}</p>
        <p>Date of Birth: {store?.data.DoB}</p>
        <p>Biography {store?.data.Bio}</p>
        <div><img className="responsive-img" src={store?.Image} alt="new" width="800"/></div>
    </>
  )
}

//   const male: any = store?.data.male.length
//   const female: any = store?.data.female.length
//     console.log(male)
//     console.log(female)
    
//   const gender = () => {

//   if (male.lenght !== 0) {
//     console.log('this is male')
  
//     return (
//     <>
//     <p>MALE</p>
//     </>
//     )
//   } else {
//     console.log('this is female')
//     return (
//       <>
//       <p>FEMALE</p>
//       </>
//       )
//   }


// }
  return (
    
    <div className={classes.root}>
      
      <AppBar position="static" color="default" style={{ margin: 0 }}>
            <Tabs value={value} onChange={handleChange} aria-label="full width tabs example" indicatorColor="primary">
                <Tab label="All Users" {...a11yProps(0)} />
                <Tab label="Stats" {...a11yProps(1)} />
                <Tab label="Last Added User" {...a11yProps(2)} />
                <Tab label="Search & View" {...a11yProps(3)}/>
            </Tabs>
      </AppBar>
                <TabPanel value={value} index={0}>
                    <FirstUser />
                    <button className="btn waves-effect waves-light" onClick={previousPage} type="submit" name="action">Previous User
                    <i className="material-icons right">exposure_neg_1</i>
                    </button>
                    <button className="btn waves-effect waves-light" type="submit" onClick={nextPage} name="action">Next User
                    <i className="material-icons right">exposure_plus_1</i>
                    </button>
                            <form className="col s12">
                                    <button className="btn waves-effect waves-light red"
                                    type="submit"
                                    name="action"
                                    onClick={DeleteUserId}>Delete User ID<i className="material-icons right">arrow_back</i>
                                  </button>
                                  <div className="row">
                                 <div className="input-field inline">
                                  <input type="number" className="validate" onChange={(e)=> {id = e.target.value}} />
                                  <label htmlFor="text">Choose User ID to delete</label>
                                </div>
                                </div>
                            </form>
                            
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Statistics />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <LastAddedUser />
                </TabPanel>
                <TabPanel value={value} index={3}> 
                    <Search />
                </TabPanel>

    </div>
  );
}
