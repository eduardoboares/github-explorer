import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Repository from '../pages/repository';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/repositories/:repository+" component={Repository} />
    </Switch>
);

export default Routes;
