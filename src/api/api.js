import axios from "axios";

const getSmartCityInfo = () => {
  return axios.get("http://127.0.0.1:4523/m1/4894598-4550342-default/api/smartcity/info")
}

const getSmartCityList = () => {
  return axios.get("http://127.0.0.1:4523/m1/4894598-4550342-default/api/smartcity/list")

}

export { getSmartCityInfo, getSmartCityList }