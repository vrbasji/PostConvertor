import { Component, OnInit, Input } from '@angular/core';
import { POSTS } from '../../mock-post';
import { Post } from '../../models/Post';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() posts: Post[];
  selectedPost: Post = {
    id: 0,
    title: "",
    description: "",
    videoUrl: ""
  };
  convertedPosts: Post[] = new Array();
  selectedPostUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl("https://www.youtube.com/watch?v=ssvdczn-9qQ&ab_channel=BeardMeatsFood");
  actualIndex: number = 0;

  constructor(private sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
  }

  ngOnInit() {
    if (this.posts.length > 0) {
      this.selectedPost = this.posts[this.actualIndex];
      this.selectedPostUrl = this.sanitizer.bypassSecurityTrustUrl(this.selectedPost.videoUrl);
    }
  }

  setPosts(posts: Post[]) {
    this.posts = posts;
    if (this.posts.length > 0) {
      this.actualIndex = 0;
      this.selectedPost = this.posts[this.actualIndex];
      this.selectedPostUrl = this.sanitizer.bypassSecurityTrustUrl(this.selectedPost.videoUrl);
    }
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
    this.selectedPostUrl = this.sanitizer.bypassSecurityTrustUrl(this.selectedPost.videoUrl);
  }

  onExport(): void {
    let text = "";
    this.convertedPosts.forEach(function (post) {
      text += post.id + ";" + post.title + ";" + post.videoUrl + ";" + post.description + "|";
    });

    var data = new Blob([text], { type: 'text/plain' });
    var csvURL = window.URL.createObjectURL(data);
    var tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'export.txt');
    tempLink.click();
  }

  onNext(): void {
    console.log(this.selectedPost);
    this.convertedPosts.push(this.selectedPost);
    this.actualIndex++;
    if (this.actualIndex < this.posts.length) {
      this.selectedPost = this.posts[this.actualIndex];
      this.selectedPostUrl = this.sanitizer.bypassSecurityTrustUrl(this.selectedPost.videoUrl);
    }
  }
}
