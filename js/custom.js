const toggleSwitcher = () => {
  
  const items = [{Furniture:['height','width','length']},{DVD:['size']},{Book:['weight']}]
  resetDisplay(items)
  const selectedItem = document.getElementById("productType").value
  enableOption(selectedItem, items)

}

const enableOption = (selectedItem, items) => {
  const obj = items.filter(item => {
    return selectedItem == Object.keys(item).toString
  })

  enableElement(Object.values(obj))
}

const resetDisplay = (items) => {
  items.forEach(obj => {
    disableElement(Object.values(obj))
  });
}

const disableElement = (ids) =>{
  ids.forEach(id => {
    const element = document.getElementById(id)
    if(!element.classList.contains('d-none')) {
      element.classList.add('d-none')
    }
  })
}


const enableElement = (ids) =>{
  ids.forEach(id => {
    const element = document.getElementById(id)
    if(element.classList.contains('d-none')) {
      element.classList.remove('d-none')
    }
  })
}