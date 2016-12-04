using Banklån.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace Banklån.DAL
{
    public class BankRepository
    {
        // GET By Id
        public LoanApplication getLoanApplication(int Id)
        {
            using (var db = new BankContext())
            {
                return db.LoanApplications.FirstOrDefault(x => x.ID == Id);
            }
        }

        // GET By birthNo
        public LoanApplication getLoanApplication(string birthNo)
        {
            using (var db = new BankContext())
            {
                try
                {
                    LoanApplication loanApp = db.LoanApplications.Where(x => x.BirthNo == birthNo).First();
                    return loanApp;
                }
                catch (Exception e)
                {
                    return null;
                }
                
            }
        }

        // GET All
        public List<LoanApplication> getAllLoanApplications()
        {
            using (var db = new BankContext())
            {
                return db.LoanApplications.ToList();
            }
        }

        // Add
        public bool addLoanApplication(LoanApplication application)
        {
            using (var db = new BankContext())
            {
                try {
                    db.LoanApplications.Add(application);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception e)
                {
                    Debug.Write(e.Message);
                    return false;
                }
            }
        }

        public bool editLoanApplication(string birthNo, LoanApplication application)
        {
            using (var db = new BankContext())
            {
                // Find LoanAppication:
                LoanApplication app = db.LoanApplications.FirstOrDefault(x => x.BirthNo == birthNo);
                application.ID = app.ID;
                try
                {
                    db.LoanApplications.AddOrUpdate(application);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception e)
                {
                    Debug.Write(e.Message);
                    return false;
                }
            }
        }
    }
}