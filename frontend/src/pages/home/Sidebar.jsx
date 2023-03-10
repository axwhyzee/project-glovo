import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import {Search} from  "@mui/icons-material"
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import IndivPost from '../../components/IndivPost';
import './home.scss';

function Sidebar() {
    const [toggle, SetToggle] = useState(true);
    const [posts, setPosts] = useState(null)
    const [searchInput, setSearchInput] = useState("");

    // we only need to render this once, so the dependency array is empty
    useEffect(() => {
    //this will return some promise data
        getAllPosts()
        console.log(posts)
    }, [])

    //this is the root URL
    const API_URL = "https://project-glovo-api.onrender.com/news/"; //note that the news URL
    
    //Get all posts
    const getAllPosts = async () => {
        const response = await fetch(API_URL, {
          method: "GET",
        });
        const data = await response.json();
        setPosts(data);
      };
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
            if (searchInput.length > 0) {
                posts.filter((post) => {
                return post.publisher.match(searchInput);
            });
        };
    }
    
    //mount the thing
    if(!posts){
        return null
    }

    return (
        <section className={'sidebar' + (toggle ? ' expanded' : '')}>
            <button className='toggle-sidebar' type='button' onClick={() => { SetToggle(!toggle) }}>
                <FontAwesomeIcon icon={toggle ? faCaretRight : faCaretLeft} />
            </button>


            <Box 
                display="flex" 
                flexDirection={'column'} 
                padding ={2} 
                justifyContent="center" 
                alignItems={"center"}
                gap = {2}
                > 
                <Box
                    borderRadius="9px"
                    gap="3rem"
                    padding="0.1rem 1.5rem"
                >
                    <InputBase placeholder="Search..."
                        sx={{
                        backgroundColor: "white",
                        borderRadius: "4rem",
                        padding: "auto",
                        margin: "auto"
                        }}
                        type="text"
                        onChange={handleChange}
                        value={searchInput}
                    />
                    <IconButton >
                        <Search />
                    </IconButton>
                </Box>

            
                {posts && 
                    posts.map((item, index) => (
                    <IndivPost 
                        date={new Date(`${item.date}`).toLocaleDateString()} 
                        description = {item.description}
                        keywords = {item.keywords}
                        id = {item._id}
                        publisher = {item.publisher}
                        title = {item.title}
                        key={index} 
                        url = {item.url}
                    /> 
                ))}
            </Box>
        </section>
    )
}

export default Sidebar;