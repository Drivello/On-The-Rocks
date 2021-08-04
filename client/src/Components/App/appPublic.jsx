import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router';

import CreateUser from '../Users/UserAdd/CreateUser'
import categoryDetail from '../Categories/CategoryDetail/categoryDetail';
import Orders from '../Orders/orders';

function AppPublic() {

	// const currentUser = (JSON.parse(localStorage.getItem('profile')));
	// const adminAllowed = (JSON.parse(localStorage.getItem('2FA')))

	return (
			<BrowserRouter>

				<Route exact path='/category/:id' component={categoryDetail} />
				<Route exact path='/login' component={CreateUser}/>
				<Route exact path="/userOrders" component={Orders} />
			</BrowserRouter>
	);
}

export default AppPublic;
