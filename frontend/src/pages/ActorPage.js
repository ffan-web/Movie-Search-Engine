import React from 'react';

const ActorPage = (props) => {
    const id = props.match.params.id

    return <div>
        <h1>Hi {id} </h1>
    </div>
}

export default ActorPage;