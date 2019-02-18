using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication
{
    public class Tax
    {
        public int ID { get; set; }
        public double HomeValue { get; set; }
        public double LandValue { get; set; }
        public double Additions { get; set; }
        public double TaxRate { get; set; }
        public double YearlyTax { get; set; }

        public Tax()
        {

        }

        public Tax(double homevalue, double landvalue, double additions)
        {
            this.HomeValue = homevalue;
            this.LandValue = landvalue;
            this.Additions = additions;
        }

        public Tax(int id, double homevalue, double landvalue, double additions, double taxrate, double yearlytax)
        {
            this.ID = id;
            this.HomeValue = homevalue;
            this.LandValue = landvalue;
            this.Additions = additions;
            this.TaxRate = taxrate;
            this.YearlyTax = yearlytax;
        }

    }
}
