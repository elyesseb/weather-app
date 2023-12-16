interface Forecast {
  city: {
    latitude: number;
    cp: number;
    insee: string;
    altitude: number;
    longitude: number;
    name: string;
  };
  forecast: {
    cp: number;
    datetime: string;
    day: number;
    dirwind10m: number;
    etp: number;
    gust10m: number;
    gustx: number;
    insee: string;
    latitude: number;
    longitude: number;
    probafog: number;
    probafrost: number;
    probarain: number;
    probawind70: number;
    probawind100: number;
    rr1: number;
    rr10: number;
    sun_hours: number;
    tmax: number;
    tmin: number;
    weather: number;
    wind10m: number;
  };
  icon: string;
  update: string;
}

export default Forecast;
