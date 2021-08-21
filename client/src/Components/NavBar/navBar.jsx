import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { AppBar, Toolbar, Typography, CssBaseline, Drawer, Hidden, IconButton, Container } from '@material-ui/core'
import { Menu, ShoppingCart, Search, AccountCircle, ExitToApp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { MenuList, SearchList,CartList } from "./drawerLists"
import NavBox from './navBox'
import { logOutUser } from "../../Redux/Users/userActions";
import jwt from 'jsonwebtoken';
import logoBrown from '../../assets/on-the-rocks-brown.png'
import logoWhite from '../../assets/on-the-rocks-white.png'



// import { logOutUser } from "../../Redux/Users/UserActions";

// const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    outline: 'none',
    backgroundColor: "d3d3d3",
    borderBottom: "1px solid #d3d3d3"
  },
  appBar: {
    width: '100%',
    background: "transparent",
    transition: 'background 300ms ease-out'
  },
  appBarSolid: {
    width: '100%',
    background: "#292F36ee",
    transition: 'background 300ms ease-out'
  },
  menu: {
    width: "100%",
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: 0
},
  menuButton: {
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(0),
  },
  icons: {
    color:'#fff',
    '&:hover':{
      color:'#fff',
    }
  },
  mobile: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  // necessary for content to be below app bar
  toolbar: {
    display: "flex",
    width: '100%',
    background: "transparent"
  },
  blank: {
    marginTop: "77.13px"
  },
  drawerPaper: {
    width: '70%',
    [theme.breakpoints.up("sm")]: {
      width: '30%',
      flexShrink: 0
    }
  },
  drawerPaperTop: {
    width: "100%",
    height: theme.mixins.toolbar.minHeight
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  navLogo: {
    width: "100px",
    marginTop: "8px"
  },
  blackColor: {
    color: "#292F36"
  }
}));

function NavBar(props) {
  const dispatch = useDispatch()
  const classes = useStyles();
  const history = useHistory();
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  const changeBackground = () => {
    if(window.scrollY > 20) {
      setSolid(true);
    } else {
      setSolid(false)
    }
  };

  window.addEventListener('scroll', changeBackground);

  const handleLogOut = () => {
    dispatch(logOutUser());
    history.push("/")
  };

  const handleProfile = () => {
    const currentUser = JSON.parse(localStorage.getItem('token')) ? 
    jwt.verify(JSON.parse(localStorage.getItem('token')), 
    process.env.REACT_APP_SECRET_KEY) : null;
    if(!currentUser) {
      return history.push("/login")
    } else {
      const { id, isAdmin } = currentUser;
  
      isAdmin 
        ? history.push(`/private/profile/${id}`)
        : history.push(`/profile/${id}`);
    }
  };

  const handleDrawerMenu = () => {
    setMenuDrawerOpen(!menuDrawerOpen);
  };

  const handleDrawerSearch = () => {
    setSearchDrawerOpen(!searchDrawerOpen);
  };

  const handleDrawerCart = () => {
    setCartDrawerOpen(!cartDrawerOpen);
  };

  return (
    <div>
    <div  className={classes.root}>
      <CssBaseline />
      <AppBar elevation={0} position="fixed" className={solid ? classes.appBarSolid : classes.appBar}>
        <Toolbar className={classes.toolbar}>

          <div style={{flexGrow: "1", width: "100%"}}>
              <Link 
                to="/" 
                style={{textDecoration: 'none', color: 'white'}}
                draggable={false}
              >
                {
                  solid ? (
                    <img 
                      src={logoWhite} 
                      alt="on-the-rocks-logo" 
                      className={classes.navLogo}
                      draggable={false}
                    />
                    ) : (
                    <img 
                      src={logoBrown} 
                      alt="on-the-rocks-logo" 
                      className={classes.navLogo}
                      draggable={false}
                    />
                  )
                }
              </Link>
          </div>

          <Hidden smDown>
            <NavBox solid={solid}/>
          </Hidden>

          <Container className={classes.menu}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerSearch}
              className={`${classes.menuButton} ${classes.search}`}
            >
              <Search className={`${classes.icons} ${solid ? "" : classes.blackColor}`}/>
            </IconButton>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerCart}
              className={classes.menuButton}
            >
              <ShoppingCart className={`${classes.icons} ${solid ? "" : classes.blackColor}`}/>
            </IconButton>

              <Hidden xsDown>  
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    className={classes.menuButton}
                    onClick={handleProfile}
                    >
                    <AccountCircle className={`${classes.icons} ${solid ? "" : classes.blackColor}`}/>
                  </IconButton>
              </Hidden>

           
            <Hidden xsDown>  
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  className={classes.menuButton}
                  onClick={handleLogOut}
                >
                  <ExitToApp className={`${classes.icons} ${solid ? "" : classes.blackColor}`}/>
                </IconButton>
            </Hidden>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerMenu}
              className={classes.menuButton}
            >
              <Menu className={`${classes.icons} ${solid ? "" : classes.blackColor}`}/>
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>
      
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            // container={container}
            variant="temporary"
            anchor="left"
            open={menuDrawerOpen}
            onClose={handleDrawerMenu}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <MenuList 
              handleDrawerMenu={handleDrawerMenu}
            />
          </Drawer>
          <Drawer
            // container={container}
            variant="temporary"
            anchor="top"
            open={searchDrawerOpen}
            onClose={handleDrawerSearch}
            classes={{
              paper: classes.drawerPaperTop
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <SearchList />
          </Drawer>
          <Drawer
            // container={container}
            variant="temporary"
            anchor="right"
            open={cartDrawerOpen}
            onClose={handleDrawerCart}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <CartList handleDrawerCart={handleDrawerCart}/>
          </Drawer>
        </Hidden>
        <div className={classes.blank} />
    </div>

    </div>
  );
}

export default NavBar;
