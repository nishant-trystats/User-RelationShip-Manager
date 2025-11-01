

export function calculatePopularity(data:any):Number{
    
    return data.uniqueFriends+(data.totalHobbies*0.5);
}
