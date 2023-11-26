export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      _GameRuleToPost: {
        Row: {
          A: number
          B: number
        }
        Insert: {
          A: number
          B: number
        }
        Update: {
          A?: number
          B?: number
        }
        Relationships: [
          {
            foreignKeyName: '_GameRuleToPost_A_fkey'
            columns: ['A']
            isOneToOne: false
            referencedRelation: 'GameRule'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: '_GameRuleToPost_B_fkey'
            columns: ['B']
            isOneToOne: false
            referencedRelation: 'Post'
            referencedColumns: ['id']
          }
        ]
      }
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Comment: {
        Row: {
          content: string
          createdAt: string
          hidden: boolean
          id: number
          parent_id: number | null
          postId: number
          userId: number
        }
        Insert: {
          content: string
          createdAt?: string
          hidden?: boolean
          id?: number
          parent_id?: number | null
          postId: number
          userId: number
        }
        Update: {
          content?: string
          createdAt?: string
          hidden?: boolean
          id?: number
          parent_id?: number | null
          postId?: number
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: 'Comment_parent_id_fkey'
            columns: ['parent_id']
            isOneToOne: false
            referencedRelation: 'Comment'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'Comment_postId_fkey'
            columns: ['postId']
            isOneToOne: false
            referencedRelation: 'Post'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'Comment_userId_fkey'
            columns: ['userId']
            isOneToOne: false
            referencedRelation: 'User'
            referencedColumns: ['id']
          }
        ]
      }
      GameRule: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      Post: {
        Row: {
          authorUserId: number
          createdAt: string
          description: string
          fen: string
          gameNr: number
          id: number
          status: Database['public']['Enums']['GameStatus']
          title: string
          type: Database['public']['Enums']['GameType']
          updatedAt: string
          variantLink: string
          verdict: string | null
        }
        Insert: {
          authorUserId: number
          createdAt?: string
          description: string
          fen: string
          gameNr: number
          id?: number
          status: Database['public']['Enums']['GameStatus']
          title: string
          type?: Database['public']['Enums']['GameType']
          updatedAt?: string
          variantLink: string
          verdict?: string | null
        }
        Update: {
          authorUserId?: number
          createdAt?: string
          description?: string
          fen?: string
          gameNr?: number
          id?: number
          status?: Database['public']['Enums']['GameStatus']
          title?: string
          type?: Database['public']['Enums']['GameType']
          updatedAt?: string
          variantLink?: string
          verdict?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'Post_authorUserId_fkey'
            columns: ['authorUserId']
            isOneToOne: false
            referencedRelation: 'User'
            referencedColumns: ['id']
          }
        ]
      }
      PostDetails: {
        Row: {
          gameClassification: Database['public']['Enums']['GameClassification'] | null
          gameplayClassification: Database['public']['Enums']['GameplayClassification'] | null
          id: number
          notes: string | null
          postId: number
        }
        Insert: {
          gameClassification?: Database['public']['Enums']['GameClassification'] | null
          gameplayClassification?: Database['public']['Enums']['GameplayClassification'] | null
          id?: number
          notes?: string | null
          postId: number
        }
        Update: {
          gameClassification?: Database['public']['Enums']['GameClassification'] | null
          gameplayClassification?: Database['public']['Enums']['GameplayClassification'] | null
          id?: number
          notes?: string | null
          postId?: number
        }
        Relationships: [
          {
            foreignKeyName: 'PostDetails_postId_fkey'
            columns: ['postId']
            isOneToOne: false
            referencedRelation: 'Post'
            referencedColumns: ['id']
          }
        ]
      }
      PostOnUserLikes: {
        Row: {
          postId: number
          userId: number
        }
        Insert: {
          postId: number
          userId: number
        }
        Update: {
          postId?: number
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: 'PostOnUserLikes_postId_fkey'
            columns: ['postId']
            isOneToOne: false
            referencedRelation: 'Post'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'PostOnUserLikes_userId_fkey'
            columns: ['userId']
            isOneToOne: false
            referencedRelation: 'User'
            referencedColumns: ['id']
          }
        ]
      }
      Session: {
        Row: {
          cookie: string
          date: string
          metadata: string
          userId: number
        }
        Insert: {
          cookie: string
          date: string
          metadata: string
          userId: number
        }
        Update: {
          cookie?: string
          date?: string
          metadata?: string
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: 'Session_userId_fkey'
            columns: ['userId']
            isOneToOne: false
            referencedRelation: 'User'
            referencedColumns: ['id']
          }
        ]
      }
      User: {
        Row: {
          id: number
          profileUrl: string | null
          refreshToken: string | null
          role: Database['public']['Enums']['UserRole']
          username: string
          uuid: string
        }
        Insert: {
          id?: number
          profileUrl?: string | null
          refreshToken?: string | null
          role?: Database['public']['Enums']['UserRole']
          username: string
          uuid: string
        }
        Update: {
          id?: number
          profileUrl?: string | null
          refreshToken?: string | null
          role?: Database['public']['Enums']['UserRole']
          username?: string
          uuid?: string
        }
        Relationships: []
      }
      Voice: {
        Row: {
          id: number
          postDetailsId: number
          testerId: number
          value: Database['public']['Enums']['VoteValue']
        }
        Insert: {
          id?: number
          postDetailsId: number
          testerId: number
          value: Database['public']['Enums']['VoteValue']
        }
        Update: {
          id?: number
          postDetailsId?: number
          testerId?: number
          value?: Database['public']['Enums']['VoteValue']
        }
        Relationships: [
          {
            foreignKeyName: 'Voice_postDetailsId_fkey'
            columns: ['postDetailsId']
            isOneToOne: false
            referencedRelation: 'PostDetails'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'Voice_testerId_fkey'
            columns: ['testerId']
            isOneToOne: false
            referencedRelation: 'User'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      GameClassification: 'MATERIALISTIC' | 'TACTICAL' | 'DYNAMIC' | 'POSITIONAL' | 'STRATEGIC' | 'FORTUNE'
      GameplayClassification: 'FIRST_POSITIVE' | 'FIRST_NEGATIVE' | 'SECOND_POSITIVE' | 'SECOND_NEGATIVE'
      GameStatus: 'ACCEPTED' | 'DECLINED' | 'PENDING_REPLY' | 'UNDER_REVIEW'
      GameType: 'NCV' | 'WOF'
      UserRole: 'TESTER' | 'MEMBER'
      VoteValue: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
