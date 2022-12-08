const successCallback = (position) => {
    getWeather(position.coords);  
  };
 
const errorCallback = (error) => console.log(error);  

// Fetches weather based on user geolocation

const getWeather = (coords)=>{
fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`)
        .then(res => res.json(res))
        .then(data => handleData(data,coords))
      }

// Reads data and calls for a new card

const handleData = (data,coords)=>{
    const temp = Math.round(data.current_weather.temperature); 
    document.querySelector('body').append(generateCard(temp,Math.round(temp*1.8+32),`Current temperature at:<br> ${coords.latitude},<br>${coords.longitude}`));
}

// Creates a new card

const generateCard = (degC,degF,bodyText)=>{

  //Create card
    const newCard = document.createElement('div');
    newCard.classList.add('card');

  //Create card__header
    const newCardHeader = document.createElement('div');
    newCardHeader.classList.add('card__header');

    const newSpanC = document.createElement('span');
    newSpanC.innerHTML = `${degC}&degC`;

    const newSeparator = document.createElement('div');
    newSeparator.classList.add('seperator');

    const newSpanF = document.createElement('span');
    newSpanF.innerHTML = `${degF}&degF`;

    newCardHeader.append(newSpanC,newSeparator,newSpanF);
  
  //Generate card__body
    const newCardBody = document.createElement('div');
    newCardBody.classList.add('card__body');

    const newP = document.createElement('p');
    newP.innerHTML= bodyText;

    newCardBody.append(newP);

  newCard.append(newCardHeader,newCardBody);
  return newCard;
}

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);