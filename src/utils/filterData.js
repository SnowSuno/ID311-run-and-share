import { db } from '~/firebase/config'
import { collection, getDocs } from "firebase/firestore"; 

export async function filterData(filterType,filterValue){
    try{
      const querySnapshot = await getDocs(collection(db, "test"))
      let data = []
      querySnapshot.docs.forEach((doc) =>{
        const backendData = doc.data()
        backendData.id = doc.id
        data.push(backendData)
      })
      //sort the data based on the selected filterType
      if(filterType === "distance" && filterValue){
        data.sort((a,b) => {
          const aDistance = a.distance;
          const bDistance = b.distance;
          const aDiff = Math.abs(aDistance - filterValue);
          const bDiff = Math.abs(bDistance - filterValue);
          return aDiff - bDiff;
        });
        return data 
      } else if (filterType === "time" && filterValue) {
        data.sort((a,b) => {
          const aTime = a.time;
          const bTime = b.time;
          const aDiff = Math.abs(aTime - filterValue);
          const bDiff = Math.abs(bTime - filterValue);
          return aDiff - bDiff;
        });
        return data
      } else if (filterType === "level" && filterValue !== 0) {
        return data.filter(item => filterValue.includes(item.level)) 
      } 
      return [];
    } catch(error){
      console.log(error)
    }
  }