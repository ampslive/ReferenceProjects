using DataGridExample.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataGridExample.ViewModels
{
    public class HomeViewModel
    {
        public string TeamName { get; set; }
        public List<Player> Players { get; set; }
    }
}
