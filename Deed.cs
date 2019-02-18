using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication
{
    public class Deed
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
        public object Address { get; set; }
        public int Block { get; set; }
        public int Lot { get; set; }
        public string DateOfSale { get; set; }
        public double SalePrice { get; set; }

        public Deed()
        {

        }

        public Deed(int id, string name, string contact, object address, int block, int lot, string dateofsale, double saleprice)
        {
            this.ID = id;
            this.Name = name;
            this.Contact = contact;
            this.Address = address;
            this.Block = block;
            this.Lot = lot;
            this.DateOfSale = dateofsale;
            this.SalePrice = saleprice;
        }
    }
}
