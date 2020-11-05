import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk  from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import profile  from '../reducers/LoginUser';
import AgentInbound  from '../reducers/AgentInblound';
import AgentOutbound from '../reducers/AgentOutbound';
import RoutesOutbound from '../reducers/RoutesOutbound';
import RoutesInbound from '../reducers/RoutesInbound';
import IVR from '../reducers/IVR'
import Queues from '../reducers/Queues'
import Users from "../reducers/Users";
import Extension from "../reducers/Extension";
import SystemSetting from '../reducers/SystemSetting'

const rootReducer = combineReducers({
    user: profile,
    AgentInbount : AgentInbound,
    AgentOutbound : AgentOutbound,
    RoutesInbound : RoutesInbound,
    RoutesOutbound : RoutesOutbound,
    IVR : IVR,
    Queues : Queues,
    Users : Users,
    Extension : Extension,
    SystemSetting : SystemSetting,
});

const configureStore = () => {
    return createStore(
        rootReducer ,
        compose(applyMiddleware(thunk))
    );
};

export default configureStore;