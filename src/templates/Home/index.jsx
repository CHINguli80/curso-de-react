import { Component } from 'react'
import './style.css';
import { PostCard } from '../../components/PostCard';
import { loadPosts } from '../../utils/load';
import { Button } from '../../components/Button';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerpage: 10
  }

 async componentDidMount() {
    await this.loadPosts()   
  }

  loadPosts = async () => {
    const { page, postsPerpage } = this.state 
    const postsAndPhotos = await loadPosts()  
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerpage),
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () => {
    const {
      page, 
      postsPerpage,
      allPosts,
      posts
    } = this.state

    const nextPage = page + postsPerpage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerpage)
    posts.push(...nextPosts)

    this.setState({ posts, page: nextPage })

  }

  render() {
    const { posts, page, postsPerpage, allPosts } = this.state
    const noMorePosts = page + postsPerpage >= allPosts.length

    return (
     <section className='container'>
         <div className="posts">
        {
          posts.map(post => (
            <PostCard 
            key={post.id}
              post={post}
            />
            ))
          }
        <div className='button-container'>
        <Button 
            text="Lore more Post"
            onclick={this.loadMorePosts}
            disabled={noMorePosts}
         />
        </div>
      </div>
     </section>
    );
  }
  
}
