import { App } from "./app";
import { AuthRoute } from "./routes/auth.route";
import { UserRoute } from "./routes/user.route";
import { PostRoute } from "./routes/post.route";
import { NotificationRoute } from "./routes/notification.route";
import { CommentRoute } from "./routes/comment.route";


const app = new App([new AuthRoute(), new UserRoute(), new PostRoute(), new NotificationRoute(), new CommentRoute()]);

app.listen();