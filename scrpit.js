let products =[];
let filteredproducts=[];
let currentpage = 1;
let itemsperpage = 5;


  fetch("./data.json").then(res => res.json())
  .then(data =>{
    products = data
    filteredproducts = products
    displayProduct()
    setuppage()
  }).catch(err => console.error(err))


  const productContainer = document.getElementById("productContainer");
  const noResult = document.getElementById("noResult");
  const pagination = document.getElementById("pagination")

  function displayProduct(){
    productContainer.innerHTML = "";
    // pagination logic

    let start = (currentpage -1) * itemsperpage
    let end = start + itemsperpage
    let items = filteredproducts.slice(start , end)
    items.forEach(product =>{
      const card = document.createElement("div");
      card.className ="card"
      card.innerHTML=`
      <h3>${product.name}</h3>
      <p><b>Brand:</b> ${product.brand}</p>
      <p><b>Price:</b> ${product.price}</p>
      <p><b>Stock:</b> ${product.stock ? "Yes":"No"}</p>
      `;
    productContainer.appendChild(card)
    })
    setuppage()
  }

  function setuppage(){
    pagination.innerHTML= "";
    let totalpages = Math.ceil(filteredproducts.length/ itemsperpage) // 4.5 5

    // prev button
    let prevbtn = document.createElement("button");
    prevbtn.innerText = "Prev";
    prevbtn.disabled = currentpage == 1;
    prevbtn.onclick = () =>{
      currentpage--;
      displayProduct();
    }
    pagination.appendChild(prevbtn);

    for(let i=1; i<=totalpages; i++){
      let btn = document.createElement('button');
      btn.innerText=i;
      btn.disabled = i == currentpage;
      btn.onclick = () =>{
      currentpage = i;
      displayProduct();
      }
      pagination.appendChild(btn)
    }

    let nextbtn = document.createElement("button");
    nextbtn.innerText = "Next"
    nextbtn.disabled = currentpage == totalpages
    nextbtn.onclick = () =>{
      currentpage++;
      displayProduct();
      }
    pagination.appendChild(nextbtn)
  }

function searchProduct(){
  const searchvalue = document.getElementById("searchInput").value.toLowerCase();
  if(searchvalue == ""){
    alert("enter the product name")
  }else{
    filteredproducts = products.filter(p =>
    p.name.toLowerCase().includes(searchvalue)
  )
  const goToProducts = document.getElementById("goToProducts")
  goToProducts.style.display="inline-block"
  currentpage = 1
  if(filteredproducts.length > 0){
    displayProduct(filteredproducts)
  } else{
    productContainer.innerHTML = "";
    noResult.style.display = "block"
  }
  }

}

function gotoproduct(){
  var product = ""
  filteredproducts = products.filter(p =>
    p.name.toLowerCase().includes(product)
  )
  document.getElementById("searchInput").value="";
  const goToProducts = document.getElementById("goToProducts")
  goToProducts.style.display="none"
  displayProduct(filteredproducts)
}

