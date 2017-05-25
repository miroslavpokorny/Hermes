using System.Web.Mvc;

namespace HermesSample.Controllers
{
    public class ManyToManyController : Controller
    {
        // GET: ManyToMany
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