import { Component, ViewChild } from '@angular/core';
import { Post } from './models/Post';
import { PostsComponent } from './components/posts/posts.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(PostsComponent)
  private postsComponent: PostsComponent;
  fileToUpload: File = null;
  posts: Post[] = new Array();
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = reader.result.toString().trim();
      console.log(text);
      const lines = text.split("|");
      lines.forEach(line => {
        const parts = line.split(";");
        if (parts.length > 1) {
          const post = {
            id: Number(parts[0]),
            title: parts[2],
            description: parts[3],
            videoUrl: parts[1]
          };
          this.posts.push(post);
        }
      });
      this.postsComponent.setPosts(this.posts);
    }
    reader.readAsText(this.fileToUpload, "ISO-8859-1");
  }
}
