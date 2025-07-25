using System;

namespace API.Interfaces;

public interface IUnitOfWork
{
    IUserRepository UserRepository { get; }
    IMessageRepository MessageRepository { get; }

    ILikesRepository LikesRepository { get; }

    Task<bool> Complte();

    bool HasChanges();
}
