using Hermes.Communication;
using Hermes.Configuration;
using Hermes.Connection;
using Owin;

namespace HermesSample
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new Configuration();
            config.MapConnection<DefaultConnection<OneToOneCommunication>>("/hermesOneToOne");
            config.MapConnection<DefaultConnection<ManyToManyCommunication>>("/hermesManyToMany");
            config.MapConnection<DefaultConnection<OneToManyCommunication>>("/hermesOneToMany");
            config.Config(app);
        }
    }
}