using Banklån.Models;
using System;
using System.Collections.Generic;
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
    }
}