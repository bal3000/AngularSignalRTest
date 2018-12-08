using Microsoft.AspNetCore.SignalR;

namespace SignalRSimpleChatServer
{
    public class ChatHub : Hub
    {
        public void SendToAll(string userName, string message)
        {
            Clients.All.SendAsync("sendToAll", userName, message);
        }

        public void StatusChange(string userName, string state)
        {
            Clients.All.SendAsync("statusChange", userName, state);
        }
    }
}