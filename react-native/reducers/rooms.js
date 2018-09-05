export default (state = [] , action) => {

    switch (action.type) {

        case 'SET_ROOMS':
            return(
                {
                    SiteID: action.SiteID,
                    details: [...action.payload]
          
                }
            )
        case 'ADD_ROOMS':
            return([...state].concat(action.payload))
        case "REMOVE_ROOM":
            roomIndex = state.filter((item, index)=> {return item.RoomId == action.payload.RoomId ? index : -1})
            if(siteIndex == -1)
                return state;
            return state.splice(siteIndex, 1);
        default:
            return state;
    }
}