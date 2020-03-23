using PrivateSquares.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using System.IO;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;

namespace PrivateSquares.Controllers
{
    public class HomeController : Controller
    {
        PrivateSquareEntities db = new PrivateSquareEntities();

        public ActionResult Registration()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Registration(RegisterProfile rp)
        {
            Register rg = new Register
            {
                Email = rp.Email,
                Password = rp.Password
            };
            db.Registers.Add(rg);
            db.SaveChanges();
            Profile pr = new Profile
            {
                FirstName = rp.FirstName,
                LastName = rp.LastName,
                OwnerId = rg.Id,
                UId = rg.Id
            };
            db.Profiles.Add(pr);
            db.SaveChanges();

            HttpCookie cookie = new HttpCookie("Login");
            cookie.Value = rg.Id.ToString();
            this.ControllerContext.HttpContext.Response.Cookies.Add(cookie);
            return RedirectToAction("MyProfile");
        }
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Login(Register rg)
        {
            List<string> list = new List<string>();

            if (rg != null)
            {

                var user = (from userlist in db.Registers
                            where userlist.Email == rg.Email && userlist.Password == rg.Password
                            select new
                            {
                                userlist.Email,
                                userlist.Password,
                                userlist.Id
                            }).ToList();
                if (user.FirstOrDefault() != null)
                {
                    HttpCookie cookie = new HttpCookie("Login");
                    cookie.Value = user[0].Id.ToString();
                    this.ControllerContext.HttpContext.Response.Cookies.Add(cookie);
                    return RedirectToAction("Contacts");
                }
                else
                {
                    ViewBag.msg = "Invalid login detail";
                    ModelState.AddModelError("", "Invalid login credentials.");
                }
            }
            else
            {
                ViewBag.msg = "Invalid login";
                ModelState.AddModelError("", "Invalid login credentials.");
            }
            return View("Login");

        }

        public ActionResult AccountSetting()
        {
            return View();
        }

        [HttpPost]
        public ActionResult ChangePassword(RegisterProfile rg)
        {
            var status = false;
            var tbl = db.Registers.ToList();
            var data = tbl.Find(x => x.Email == rg.Email && x.Password == rg.CurrentPassword);
            if (data != null)
            {
                data.Password = rg.NewPassword;
                db.Entry(data).State = EntityState.Modified;
                db.SaveChanges();
                ViewBag.changepwsmsg = "Password Changed";
                status = true;
            }
            else
            {
                ViewBag.changepwsmsg = "Invalid detail";
                status = false;
            }
            return Json(status, JsonRequestBehavior.AllowGet);
        }

        public ActionResult MyProfile()
        {
            var id = Request.Cookies["Login"];
            var uid = id.Value;

            var tbl = db.Profiles.ToList();
            var data = tbl.Find(x => x.UId == Convert.ToInt64(uid));
            return View(data);
        }

        public JsonResult UserProfile()
        {
            int uid = Getloginid();
            List<ProfileData> list = db.Profiles.ToList().Where(f => f.UId == uid).Select(x => new ProfileData()
            {
                Id = x.Id,
                UId = x.UId,
                OwnerId = x.OwnerId,
                FirstName = x.FirstName,
                LastName = x.LastName,
                PhoneNo = x.PhoneNo,
                JobTitle = x.JobTitle,
                Company = x.Company,
                Email = x.Email,
                GroupId = x.GroupId,
                Note = x.Note,

                ImageBase64 = (x.Image != null) ? Convert.ToBase64String(x.Image) : string.Empty,
                Addresses = GetAddressesById(x.UId)
            }).ToList();

            var data = Json(list);
            data.MaxJsonLength = int.MaxValue;
            return (data);
        }

        [HttpPost]
        public JsonResult GetEmail()
        {
            var id = Request.Cookies["Login"];
            var uid = id.Value;


            var tbl = db.Registers.ToList();
            var data = tbl.Find(x => x.Id == Convert.ToInt64(uid));
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddProfile(ProfileData data)
        {
            Profile pr = new Profile
            {
                Id = data.Id,
                UId = data.UId,
                FirstName = data.FirstName,
                LastName = data.LastName,
                Email = data.Email,
                Company = data.Company,
                JobTitle = data.JobTitle,
                PhoneNo = data.PhoneNo,
                GroupId = data.GroupId,
                Note = data.Note,
            };
            if (data.Image != null)
            {
                pr.Image = data.Image;
            }

            db.Entry(pr).State = EntityState.Modified;
            db.SaveChanges();
            //var tbl = db.Addresses.ToList().Where(x => x.UserId == pr.UId).SingleOrDefault();

            Address ad;
            foreach (CustomAddress address in data.CustomAddresses)
            {
                ad = new Address();
                ad.Id = address.Id;
                ad.UserId = pr.UId;
                ad.Street = address.Street;
                ad.City = address.City;
                ad.State = address.State;
                ad.Country = address.Country;
                db.Entry(ad).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        #region AddContact
        public ActionResult AddContact()
        {
            var id = Request.Cookies["Login"];
            var uid = id.Value;


            var tbl = db.Profiles.ToList();
            var data = tbl.Find(x => x.UId == Convert.ToInt64(uid));
            return View(data);
        }
        [HttpPost]
        public JsonResult AddContact(ProfileData data)
        {
            Register rg = new Register
            {
                Email = null,
            };
            db.Registers.Add(rg);
            db.SaveChanges();

            Profile pr = new Profile
            {
                UId = rg.Id,
                OwnerId = data.OwnerId,
                FirstName = data.FirstName,
                LastName = data.LastName,
                Email = data.Email,
                Company = data.Company,
                JobTitle = data.JobTitle,
                PhoneNo = data.PhoneNo,
                Image = data.Image,
                GroupId = data.GroupId,
                Note = data.Note,

            };
            db.Profiles.Add(pr);
            db.SaveChanges();

            Address ad;
            foreach (CustomAddress address in data.CustomAddresses)
            {
                ad = new Address();
                ad.UserId = pr.UId;
                ad.Street = address.Street;
                ad.City = address.City;
                ad.State = address.State;
                ad.Country = address.Country;
                db.Addresses.Add(ad);
                db.SaveChanges();
            }
            // ICollection<Address> addr = data.Addresses;
            //foreach (var ad in data.Addresses)
            //{
            //    ad.UserId = pr.UId;
            //    db.Addresses.Add(ad);
            //    db.SaveChanges();
            //}
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        #endregion

        public ActionResult GetEditContactdata(int id)
        {
            int uid = Getloginid();
            List<ProfileData> list = db.Profiles.ToList().Where(f => f.UId == id).Select(x => new ProfileData()
            {
                Id = x.Id,
                UId = x.UId,
                OwnerId = x.OwnerId,
                FirstName = x.FirstName,
                LastName = x.LastName,
                PhoneNo = x.PhoneNo,
                JobTitle = x.JobTitle,
                Company = x.Company,
                Email = x.Email,
                GroupId = x.GroupId,
                Note = x.Note,
                ImageBase64 = (x.Image != null) ? Convert.ToBase64String(x.Image) : string.Empty,
                Addresses = GetAddressesById(x.UId)
            }).ToList();

            var data = Json(list);
            data.MaxJsonLength = int.MaxValue;
            return (data);
        }

        private ICollection<Address> GetAddressesById(long? uId)
        {
            var Addlist = db.Addresses.Where(f => f.UserId == uId).ToList();
            return Addlist;
        }

        public JsonResult EditContact(ProfileData pro)
        {
            Profile pr = new Profile
            {
                Id = pro.Id,
                OwnerId = pro.OwnerId,
                UId = pro.UId,
                FirstName = pro.FirstName,
                LastName = pro.LastName,
                Email = pro.Email,
                Company = pro.Company,
                JobTitle = pro.JobTitle,
                PhoneNo = pro.PhoneNo,
                Image = pro.Image,
                GroupId = pro.GroupId,
                Note = pro.Note,
            };
            db.Entry(pr).State = EntityState.Modified;
            db.SaveChanges();


            //ICollection<CustomAddress> addr = pro.CustomAddresses;
            Address ad;
            foreach (CustomAddress address in pro.CustomAddresses)
            {
                ad = new Address();
                ad.Id = address.Id;
                ad.UserId = pro.UserId;
                ad.Street = address.Street;
                ad.City = address.City;
                ad.State = address.State;
                ad.Country = address.Country;
                db.Entry(ad).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RemoveContact(string id)
        {
            var Profdata = db.Profiles.ToList().Find(x => x.UId == Convert.ToInt64(id));
            var Adddata = db.Addresses.ToList().Find(x => x.UserId == Convert.ToInt64(id));
            var Regdata = db.Registers.ToList().Find(x => x.Id == Convert.ToInt64(id));
            db.Profiles.Remove(Profdata);
            db.Addresses.Remove(Adddata);
            db.Registers.Remove(Regdata);
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Contacts()
        {
            //var tbl = db.Profiles.ToList();
            //var data = tbl.Where(x => x.GroupId == 2);
            return View(db.Profiles.ToList());
        }
        [HttpPost]
        public ActionResult ContactsList(int GroupId)
        {
            int uid = Getloginid();
            List<ProfileData> list = db.Profiles.ToList().Where(f => (GroupId == 0 || f.GroupId == GroupId) && f.OwnerId == uid && f.OwnerId != f.UId).Select(x => new ProfileData()
            {
                Id = x.Id,
                UId = x.UId,
                OwnerId = x.OwnerId,
                FirstName = x.FirstName,
                LastName = x.LastName,
                PhoneNo = x.PhoneNo,
                JobTitle = x.JobTitle,
                Company = x.Company,
                Email = x.Email,
                GroupId = x.GroupId,
                Note = x.Note,
                ImageBase64 = (x.Image != null) ? Convert.ToBase64String(x.Image) : string.Empty,
                //Addresses = GetAddressesById(x.UId)
            }).ToList();

            var data = Json(list);
            data.MaxJsonLength = int.MaxValue;
            return (data);
        }

        private int Getloginid()
        {
            var id = Request.Cookies["Login"];
            var uid = id.Value;
            return Convert.ToInt32(uid);
        }

        [HttpPost]
        public ActionResult CountContacts()
        {
            int[] listArr = new int[6];
            var id = Request.Cookies["Login"];
            var uid = id.Value;
            //var ID=uid.Split()
            var Countlist = db.Profiles.ToList();
            List<int> li = new List<int>();
            var totalcontacts = Countlist.Where(x => x.GroupId != 0 && x.OwnerId == Convert.ToInt64(uid)).Count();
            var totalfriends = Countlist.Where(x => x.GroupId == 1 && x.OwnerId == Convert.ToInt64(uid)).Count();
            var totalfamily = Countlist.Where(x => x.GroupId == 2 && x.OwnerId == Convert.ToInt64(uid)).Count();
            var totalbusiness = Countlist.Where(x => x.GroupId == 3 && x.OwnerId == Convert.ToInt64(uid)).Count();
            var totalhotlist = Countlist.Where(x => x.GroupId == 4 && x.OwnerId == Convert.ToInt64(uid)).Count();

            li.Add(totalcontacts);
            li.Add(totalfriends);
            li.Add(totalfamily);
            li.Add(totalbusiness);
            li.Add(totalhotlist);

            var data = Json(li);
            //data.MaxJsonLength = int.MaxValue;
            return (data);
            //return Json("Hello");list
        }

        public ActionResult Logout()
        {
            if (Request.Cookies["Login"] != null)
            {
                Response.Cookies["Login"].Expires = DateTime.Now.AddDays(-1);
            }
            return RedirectToAction("Login");
        }

        [HttpPost]
        public ActionResult ChangeOwner(Register rg)
        {
            rg.Id = rg.Id;
            rg.Email = rg.Email;
            rg.Password = rg.Password;
            var status = true;
            var data = db.Registers.ToList().Find(x => x.Id == rg.Id);
            if (data == null)
            {
                db.Entry(rg).State = EntityState.Modified;
                db.SaveChanges();
                status = true;
            }
            else
            {
                ViewBag.Javascript = "<script language='javascript' type='text/javascript'>alert('Data Already Exists');</script>";
                status = false;
            }


            return Json(new { rg, status }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Mail(Email model)
        {
            var obj = SendEmail(model);
            try
            {
                return Json(obj.Result);
            }
            catch (Exception ex)
            {

            }
            return Json(obj.Result);

        }

        public async Task<bool> SendEmail(Email model)
        {
            Task.WaitAll();
            if (ModelState.IsValid)
            {
                var body = "<p>Email From: {0} ({1})</p><p>Message:</p><p>{2}</p>";
                var message = new MailMessage();
                message.To.Add(new MailAddress(model.Tomail));  // replace with valid value 
                message.From = new MailAddress(model.FromEmail);  // replace with valid value
                message.Subject = "Your email subject";
                message.Body = string.Format(body, model.FromName, model.FromEmail, model.Message);
                message.IsBodyHtml = true;

                using (var smtp = new SmtpClient())
                {
                    smtp.Host = "smtp.gmail.com";
                    smtp.Port = 587;
                    smtp.EnableSsl = true;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new NetworkCredential("nehadhimancityinfomart@gmail.com", "Elite^123");
                    smtp.Send(message);
                }
            }
            return true;
        }

        public ActionResult Test()
        {
            return View();
        }
    }
}

