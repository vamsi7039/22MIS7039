import React, { useEffect, useState } from "react";
import axios from "axios";
import {
AppBar,
Toolbar,
Typography,
Container,
Grid,
Card,
CardContent,
Chip,
FormControl,
InputLabel,
Select,
MenuItem,
Button,
Box,
CircularProgress
} from "@mui/material";

export default function App() {

const [notifications,setNotifications] = useState([]);
const [limit,setLimit] = useState(10);
const [type,setType] = useState("");
const [loading,setLoading] = useState(false);

const dummyData = [
{
ID:"1",
Type:"Placement",
Message:"Microsoft Hiring Drive",
Timestamp:"2026-05-16 15:20",
viewed:false
},
{
ID:"2",
Type:"Result",
Message:"Semester Results Published",
Timestamp:"2026-05-16 15:18",
viewed:false
},
{
ID:"3",
Type:"Event",
Message:"Hackathon Registration Open",
Timestamp:"2026-05-16 15:10",
viewed:true
}
];

const fetchNotifications = async () => {

setLoading(true);

try{

const response = await axios.get(
`http://4.224.186.213/evaluation-service/notifications?limit=${limit}&notification_type=${type}`
);

if(
response.data &&
response.data.notifications &&
response.data.notifications.length > 0
){

const data = response.data.notifications.map((item,index)=>({
...item,
viewed:index>2
}));

setNotifications(data);

}else{

setNotifications(dummyData);

}

}catch(error){

setNotifications(dummyData);

}

setLoading(false);

};

useEffect(()=>{
fetchNotifications();
},[limit,type]);

const getColor = (value) => {

if(value==="Placement") return "success";
if(value==="Result") return "primary";
return "warning";

};

return (
<>

<AppBar position="static">
<Toolbar>
<Typography variant="h6">
Campus Notifications Dashboard
</Typography>
</Toolbar>
</AppBar>

<Container sx={{mt:4}}>

<Box
sx={{
display:"flex",
gap:2,
flexWrap:"wrap",
mb:4
}}
>

<FormControl sx={{minWidth:180}}>

<InputLabel>Type</InputLabel>

<Select
value={type}
label="Type"
onChange={(e)=>setType(e.target.value)}
>

<MenuItem value="">All</MenuItem>
<MenuItem value="Placement">Placement</MenuItem>
<MenuItem value="Result">Result</MenuItem>
<MenuItem value="Event">Event</MenuItem>

</Select>

</FormControl>

<FormControl sx={{minWidth:160}}>

<InputLabel>Limit</InputLabel>

<Select
value={limit}
label="Limit"
onChange={(e)=>setLimit(e.target.value)}
>

<MenuItem value={5}>5</MenuItem>
<MenuItem value={10}>10</MenuItem>
<MenuItem value={20}>20</MenuItem>

</Select>

</FormControl>

<Button
variant="contained"
onClick={fetchNotifications}
>
Refresh
</Button>

</Box>

{
loading ?

<Box
sx={{
display:"flex",
justifyContent:"center",
mt:8
}}
>
<CircularProgress />
</Box>

:

<Grid container spacing={3}>

{
notifications.map((item)=>(
<Grid item xs={12} md={6} lg={4} key={item.ID}>

<Card
sx={{
borderRadius:"16px",
boxShadow:4,
height:"100%",
opacity:item.viewed ? 0.75 : 1,
border:item.viewed
? "1px solid #ccc"
: "2px solid #1976d2"
}}
>

<CardContent>

<Box
sx={{
display:"flex",
justifyContent:"space-between",
mb:2
}}
>

<Chip
label={item.Type}
color={getColor(item.Type)}
/>

<Chip
label={item.viewed ? "Viewed" : "New"}
color={item.viewed ? "default" : "error"}
/>

</Box>

<Typography
variant="h6"
sx={{
fontWeight:"bold"
}}
>
{item.Message}
</Typography>

<Typography
variant="body2"
sx={{
mt:1
}}
>
{item.Timestamp}
</Typography>

</CardContent>

</Card>

</Grid>
))
}

</Grid>

}

</Container>

</>
);

}