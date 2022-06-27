using Microsoft.AspNetCore.Mvc;
using AnnexioTest.Models;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace AnnexioTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [ResponseCache(Duration = 3510, Location = ResponseCacheLocation.Any, NoStore = false)]
    public class CountryListController : ControllerBase
    {
        private readonly ILogger<CountryListController> _logger;

        public CountryListController(ILogger<CountryListController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<Country> CountryList = new List<Country>();
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync("https://restcountries.com/v2/all"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    CountryList = JsonConvert.DeserializeObject<List<Country>>(apiResponse);
                    // reservationList = JsonConvert.DeserializeObject<List<Reservation>>(apiResponse);
                }
            }
            return Ok(CountryList);
        }


        [HttpGet]
        [Route("countrybyname/{cname}")]
        public async Task<IActionResult> FindCountry(string cname)
        {
           // List<Country> CountryList = new List<Country>();
            
            using (var httpClient = new HttpClient())
            {
                //if (ctype == "name")
                //{
                //    using (var response = await httpClient.GetAsync("https://restcountries.com/v2/alpha/"+cval))
                //    {
                //            string apiResponse = await response.Content.ReadAsStringAsync();
                //           CountryList = JsonConvert.DeserializeObject<List<Country>>(apiResponse);
                //    }
                //}

                //if (ctype == "code")
                {
                    using (var response = await httpClient.GetAsync("https://restcountries.com/v2/name/"+ cname))
                    {
                        var apiResponse = await response.Content.ReadAsStringAsync();
                        //CountryList = JsonConvert.DeserializeObject<List<Country>>(apiResponse);
                        return Ok(apiResponse);

                    }
                }
            }
            return Ok("");

        }


        [HttpGet]
        [Route("countrybycode/{ccode}")]
        public async Task<IActionResult> FindCountryByCode(string ccode)
        {
            //List<Country> CountryList = new List<Country>();
            //JavaScriptSerializer js = new JavaScriptSerializer();
            using (var httpClient = new HttpClient())
            {
               
                {
                    using (var response = await httpClient.GetAsync("https://restcountries.com/v2/alpha/" + ccode))
                    {
                        var apiResponse = await response.Content.ReadAsStringAsync();
                        return Ok(apiResponse);
                        //CountryList = JsonConvert.DeserializeObject<List<Country>>(apiResponse);
                    }
                }
               
            }
            return Ok("");

        }


        [HttpGet]
        [Route("getregion/{region}")]
        public async Task<IActionResult> FindRegion(string region)
        {
          
            using (var httpClient = new HttpClient())
            {

                {
                    using (var response = await httpClient.GetAsync("https://restcountries.com/v3.1/region/" + region))
                    {
                        var apiResponse = await response.Content.ReadAsStringAsync();
                        
                        return Ok(apiResponse);
                    }
                }

            }
            return Ok("");

        }


        [HttpGet]
        [Route("getsubregion/{subregion}")]
        public async Task<IActionResult> FindSubRegion(string subregion)
        {

            using (var httpClient = new HttpClient())
            {

                {
                    using (var response = await httpClient.GetAsync("https://restcountries.com/v3.1/subregion/" + subregion))
                    {
                        var apiResponse = await response.Content.ReadAsStringAsync();
                        return Ok(apiResponse);
                    }
                }

            }
            return Ok("");

        }


    }
}