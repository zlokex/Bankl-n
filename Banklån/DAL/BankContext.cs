using Banklån.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace Banklån.DAL
{
    public class BankContext : DbContext
    {
        public BankContext() : base("name=Bank")
        {
            Database.CreateIfNotExists();
        }

        public DbSet<LoanApplication> LoanApplications { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
}
}