using Banklån.DAL;
using Banklån.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Script.Serialization;

namespace Banklån.Controllers
{
    public class LoanApplicationController : ApiController
    {
        private BankRepository _repository = new BankRepository();

        // GET api/LoanApplication
        public HttpResponseMessage Get()
        {
            var allLoanApplications = _repository.getAllLoanApplications();
            string JSonString = new JavaScriptSerializer().Serialize(allLoanApplications);

            return new HttpResponseMessage()
            {
                Content = new StringContent(JSonString, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.OK
            };
        }

        

        // GET api/LoanApplication/S
        public HttpResponseMessage Get(string id)
        {
            var loanApplication = _repository.getLoanApplication(id);
            string JSonString = new JavaScriptSerializer().Serialize(loanApplication);

            return new HttpResponseMessage()
            {
                Content = new StringContent(JSonString, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.OK
            };
        }

        // POST api/LoanApplication
        [HttpPost]
        public HttpResponseMessage Post([FromBody]LoanApplication loanApplication)
        {
            if (ModelState.IsValid)
            {
                bool success = _repository.addLoanApplication(loanApplication);

                if (success)
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.OK
                    };
                }
                else
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest,
                        Content = new StringContent("Kunne ikke sette inn lånsøknaden i DB")
                    };
                }
            }
            else
            {
                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    Content = new StringContent("Kunne ikke legge til lånsøknaden")
                };
            }
        }

        // PUT api/LoanApplication/5
        [HttpPut]
        public HttpResponseMessage Put(string id, [FromBody]LoanApplication loanApplication)
        {
            if (ModelState.IsValid)
            {
                bool success = _repository.editLoanApplication(id, loanApplication);
                if (success)
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.OK
                    };
                }
            }
            return new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.NotFound,
                Content = new StringContent("Kunne ikke endre kunden i DB")
            };
        }
    }
}
