export const Error = (str) => {
    switch(str) {
        case "Please select more tags (min. two)":
            return "moreTags"
            break
        case "Cannot read property 'status' of undefined":
            return "statusUndefined"
            break
        case "No tag selected":
            return "noTagSelected"
            
        default : return str
        
    }
}