using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApiNopCommerce
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
            services.AddSingleton<IPersonRepository<PersonInfo, int>, PersonRepository>();
        }
    }
}