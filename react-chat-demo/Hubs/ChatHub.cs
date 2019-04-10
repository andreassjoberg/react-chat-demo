using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace react_chat_demo.Hubs
{
    public class ChatHub : Hub
    {
        public async Task PostMessage(string user, string message)
        {
            await Clients.All.SendAsync("messagePosted", user, message);
        }
    }
}
