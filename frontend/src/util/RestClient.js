const url = "http://localhost:8080";

// // const signup = (username, name) => {

// }

const login = (username, setUserData, setRegEvents, setIsLoggedIn) => {
    const reqBody = {username: username};
    return fetch(url + '/user/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody)
    })
    .then((res) => res.json())
    .then((response) => {
        const loginResponse = {};
        if(response.status == 200) {
            loginResponse.status = true;
            setUserData({
                "id": response.data.id,
                "name": response.data.name,
                "username": response.data.username,
                "numEvents": response.data.numEvents
            });
            setRegEvents(response.data.events);
            setIsLoggedIn(true);
        } else loginResponse.status = false;
        loginResponse.message = response.message;
        return loginResponse;
    })
    .catch((error) => {
        console.log(error);
        return {status: false, message: "An unexpected error occurred. Try again later."};
    });
}


const signup = (username, name)=>{
    const reqBody = {username: username , name: name};
    return fetch(url + '/user', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody)
    })
    .then((res) => res.json())
    .then((response) => {
        const signupResponse = {};
        if(response.status == 201) {
            signupResponse.status = true;
    
        } else
         {
            signupResponse.status = false ;
        }
        signupResponse.message = response.message;
        return signupResponse;
    })
    .catch((error) => {
        console.log(error);
        return {status: false, message: "An unexpected error occurred. Try again later."};
    });
}

const getUnregEvents = (regEvents, setUnregEvents) => {
    return fetch(url + '/event', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res) => res.json())
    .then((response) => {
        const unregEventsResponse = {};
        if(response.status == 200) {
            unregEventsResponse.status = true;
            var unregEvents = response.data;
            unregEvents = unregEvents.filter(event => !regEvents.find(revent => (event.id === revent.id)));
            setUnregEvents(unregEvents);
        } else unregEventsResponse.status = false;
        unregEventsResponse.message = response.message;
        return unregEventsResponse;
    })
    .catch((error) => {
        console.log(error);
        return {status: false, message: "An unexpected error occurred. Try again later."};
    });

}

const registerEvent = (userId, event, regEvents, setRegEvents, unregEvents, setUnregEvents) => {
    const reqBody = {eventId: event.id};
    return fetch(url + '/user/' + userId + '/event', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody)
    })
    .then((res) => res.json())
    .then((response) => {
        const registerResponse = {};
        if(response.status == 201) {
            registerResponse.status = true;
            setRegEvents([...regEvents, event])
            setUnregEvents(unregEvents.filter(uevent => uevent.id != event.id));
        } else registerResponse.status = false;
        registerResponse.message = response.message;
        return registerResponse;
    })
    .catch((error) => {
        console.log(error);
        return {status: false, message: "An unexpected error occurred. Try again later."};
    });

}


const unregisterEvent = (userId, event, regEvents, setRegEvents, unregEvents, setUnregEvents) => {
    return fetch(url + '/user/' + userId + '/event/' + event.id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res) => res.json())
    .then((response) => {
        const unregisterResponse = {};
        if(response.status == 200) {
            unregisterResponse.status = true;
            setUnregEvents([...unregEvents, event])
            setRegEvents(regEvents.filter(revent => revent.id != event.id));
        } else unregisterResponse.status = false;
        unregisterResponse.message = response.message;
        return unregisterResponse;
    })
    .catch((error) => {
        console.log(error);
        return {status: false, message: "An unexpected error occurred. Try again later."};
    });  
    
}


export {
    login,
    getUnregEvents,
    registerEvent,
    unregisterEvent,
    signup
};
