/* eslint-disable import/no-anonymous-default-export */
export function updateData (allData, oneData) {
    let all = allData.map(u => u.index !== oneData.index ? u : oneData);
    return all
}

export default { 
    updateData 
}