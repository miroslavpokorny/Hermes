using System.Web.Mvc;

namespace HermesSample.Controllers
{
    public class OneToOneController : Controller
    {
        // GET: OneToOne
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