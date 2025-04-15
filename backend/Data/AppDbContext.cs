using System;
using Microsoft.EntityFrameworkCore;
using backend.Models;
// data base context file,
namespace backend.Data
{
    public class AppDbContext : DbContext // inherting from dbcontext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // DbSet for your Book model
        public DbSet<Book> Books { get; set; } // setting the books table

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>(entity =>
            {
                entity.HasIndex(e => e.BookId)
                      .HasDatabaseName("IX_Books_BookID")
                      .IsUnique();

                entity.Property(e => e.BookId).HasColumnName("BookID");
                entity.Property(e => e.Isbn).HasColumnName("ISBN");
            });
        }
    }
}
