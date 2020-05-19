export default function alertError(value = {'error':'Server error Please try again later'}){
  if(value['error'] !== undefined){
    window.alert(value['error']);
    return true
  }
  return false
}