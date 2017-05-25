using System.Web.Mvc;

namespace HermesSample.Controllers
{
    public class OneToManyController : Controller
    {
        // GET: OneToMany
        public ActionResult Index(string id = null)
        {
            if (!string.IsNullOrEmpty(id))
            {
                ViewBag.SessionId = id;
            }
            return View();
        }
    }
}