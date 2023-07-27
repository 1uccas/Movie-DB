document.write(
    `
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Dancing+Script:wght@700&family=Fruktur&family=Give+You+Glory&family=Lobster&family=Nanum+Pen+Script&family=Oswald:wght@300;400&family=Patrick+Hand&family=Roboto:wght@300&family=Shadows+Into+Light&family=Sriracha&display=swap');
  
        body{
            padding: 0;
            margin: 0;
        }
        #header-box-container{
            font-family: 'Lobster', cursive;
            background: linear-gradient(to right, gray, white); 
            font-size: 50px;
            text-align: center;
            padding: 1rem;
            margin-bottom: 30px;
            color: black;
            font-weight: 400;
        }
        #header-box-container header{
            margin-left: 50px;
        }
        #header-box-container img{
            position: absolute;
            margin-top: -5px;
            margin-left: -75px;
            width: 70px;
        }
    </style>

    <div id="header-box-container">
        <header><img src="/image/header-image/box.png"></img> Actors Box</header>
    </div>
    `
)
