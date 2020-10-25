using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DataGridExample.Models;
using DataGridExample.ViewModels;

namespace DataGridExample.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
        
        public ActionResult LoadData()
        {
            var viewModel = new HomeViewModel();
            viewModel.Players = new List<Player>() {
                new Player { Id=1, Name="David Warner" },
                new Player { Id=2, Name="Johnny Bairstow" }
            };

            //return View(viewModel);
            return Json(new { success = "success", data = viewModel.Players.ToList() });
        }

        [HttpPost]
        public IActionResult SaveAllData(IEnumerable<Player> players)
        {
            var viewModel = new HomeViewModel();

            //return View();
            return Json(new { success = "success--", data = viewModel });
        }


        [HttpGet]
        public ActionResult EditData(int? id)
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
