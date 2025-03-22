import axios from "axios";


const requestContainer= async (id,navigate,url,setProviderId)=>{
    if(await checkProvider(id,url)){
        navigate('/createContainer');
    }
    else{ 
        alert(`Something went wrong use another provider`);
    }

}
const checkProvider = async (id,url)=>{
    try{
        const response = await axios.get(url+"/providers/:"+id,{id});
        console.log(url);
        if(response.data)
            return true;
        return false;
    }
    catch (err){
        console.error(err.response?.data?.error || 'Something went wrong');
        return false;
    }
}
export {requestContainer};